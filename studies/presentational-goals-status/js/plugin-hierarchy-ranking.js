var jsPsychHierarchyRanking = (function (jspsych) {
    'use strict';

    const info = {
        name: 'hierarchy-ranking',
        parameters: {
            preamble: {
                type: jspsych.ParameterType.HTML_STRING,
                default: '<p>Arrange the characters to show their social rank. Higher position = higher rank.</p>',
            },
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                default: '',
            },
            canvas_width: {
                type: jspsych.ParameterType.INT,
                default: 300,
            },
            canvas_height: {
                type: jspsych.ParameterType.INT,
                default: 180,
            },
            button_label: {
                type: jspsych.ParameterType.STRING,
                default: 'Continue',
            },
        },
    };

    class HierarchyRankingPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {
            var self = this;
            var start_time = performance.now();

            var canvasW = trial.canvas_width;
            var canvasH = trial.canvas_height;
            var cardW = 80;
            var cardH = 40;

            // State
            var placements = {
                red:    { x: null, y: null },
                green:  { x: null, y: null },
                purple: { x: null, y: null },
            };

            // Build HTML
            var html = '';

            // Stimulus (scene grid) above
            if (trial.stimulus) {
                html += '<div id="hierarchy-stimulus">' + trial.stimulus + '</div>';
            }

            // Preamble
            html += '<div id="hierarchy-preamble" style="margin: 8px 0; text-align:center;">' + trial.preamble + '</div>';

            // Ranking area
            html += '<div id="ranking-wrapper" style="display:flex; flex-direction:row; align-items:center; justify-content:center; gap:15px; margin: 5px auto; user-select:none;">';

            // Rank arrow indicator (left of canvas)
            // "Rank" label column
            html += '<div style="display:flex; align-items:center; justify-content:center; height:' + canvasH + 'px; font-size:10px; color:#888; user-select:none;">';
            html += '<span style="writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:2px; font-weight:bold;">Rank</span>';
            html += '</div>';

            // Arrow indicator column
            html += '<div style="display:flex; flex-direction:column; align-items:center; justify-content:space-between; height:' + canvasH + 'px; font-size:10px; color:#888; user-select:none;">';
            html += '<div style="display:flex; flex-direction:column; align-items:center;"><span style="font-size:14px;">&#9650;</span><span style="writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:1px;">Higher</span></div>';
            html += '<div style="display:flex; flex-direction:column; align-items:center;"><span style="writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:1px;">Lower</span><span style="font-size:14px;">&#9660;</span></div>';
            html += '</div>';

            // Canvas area (no tiers, just an open rectangle)
            html += '<div id="canvas-area" style="position:relative; width:' + canvasW + 'px; height:' + canvasH + 'px; border:2px solid #999; border-radius:8px; background:#f5f5f5; overflow:hidden;">';
            // Subtle center guides
            html += '<div style="position:absolute; left:50%; top:0; bottom:0; width:1px; background:#e8e8e8; pointer-events:none;"></div>';
            html += '<div style="position:absolute; top:50%; left:0; right:0; height:1px; background:#e8e8e8; pointer-events:none;"></div>';
            html += '</div>'; // canvas-area

            // Card dock (vertical column on the right)
            html += '<div id="card-dock" style="display:flex; flex-direction:column; align-items:center; gap:12px; min-width:' + (cardW + 10) + 'px;">';

            var characters = [
                { id: 'red', label: 'Red', bg: '#e53935', text: '#fff' },
                { id: 'green', label: 'Green', bg: '#43a047', text: '#fff' },
                { id: 'purple', label: 'Purple', bg: '#8e24aa', text: '#fff' },
            ];

            for (var c = 0; c < characters.length; c++) {
                var ch = characters[c];
                html += '<div class="character-card" data-character="' + ch.id + '" style="' +
                    'width:' + cardW + 'px; height:' + cardH + 'px; border-radius:8px; cursor:grab;' +
                    'background:' + ch.bg + '; color:' + ch.text + ';' +
                    'display:flex; align-items:center; justify-content:center;' +
                    'font-weight:bold; font-size:14px;' +
                    'box-shadow:0 2px 6px rgba(0,0,0,0.3);' +
                    'position:relative; z-index:10;' +
                    '">' + ch.label + '</div>';
            }

            html += '</div>'; // card-dock
            html += '</div>'; // ranking-wrapper

            // Explanation text area
            html += '<div id="hierarchy-explanation-container" style="text-align:center; margin:8px auto; max-width:600px;">';
            html += '<label for="hierarchy-explanation" style="display:block; font-size:16px; margin-bottom:4px;">Briefly explain your intuition about the relationships between the characters:</label>';
            html += '<textarea id="hierarchy-explanation" rows="2" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:13px; resize:vertical; box-sizing:border-box;" placeholder="Type your explanation here..."></textarea>';
            html += '</div>';

            // Submit button
            html += '<div style="text-align:center; margin-top:8px;">';
            html += '<button id="hierarchy-submit" class="jspsych-btn" disabled>' + trial.button_label + '</button>';
            html += '</div>';

            display_element.innerHTML = html;

            // ----- Drag and drop logic -----
            var canvasArea = display_element.querySelector('#canvas-area');
            var cards = display_element.querySelectorAll('.character-card');
            var submitBtn = display_element.querySelector('#hierarchy-submit');
            var dock = display_element.querySelector('#card-dock');

            var dragging = null;
            var dragOffsetX = 0;
            var dragOffsetY = 0;

            function getCanvasRect() {
                return canvasArea.getBoundingClientRect();
            }

            function getPlacedCards(excludeCard) {
                var placed = [];
                var allCards = canvasArea.querySelectorAll('.character-card');
                for (var i = 0; i < allCards.length; i++) {
                    var c = allCards[i];
                    if (c === excludeCard) continue;
                    var id = c.getAttribute('data-character');
                    if (placements[id].x === null) continue;
                    placed.push({
                        element: c,
                        left: parseFloat(c.style.left),
                        top: parseFloat(c.style.top),
                        id: id
                    });
                }
                return placed;
            }

            function getBoundingBox(cardList) {
                var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                for (var i = 0; i < cardList.length; i++) {
                    minX = Math.min(minX, cardList[i].left);
                    minY = Math.min(minY, cardList[i].top);
                    maxX = Math.max(maxX, cardList[i].left + cardW);
                    maxY = Math.max(maxY, cardList[i].top + cardH);
                }
                return {
                    left: minX, top: minY, right: maxX, bottom: maxY,
                    centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2
                };
            }

            // Group placed cards into rows by their Y position
            function groupIntoRows(cards) {
                var rowMap = {};
                for (var i = 0; i < cards.length; i++) {
                    var y = Math.round(cards[i].top);
                    if (!rowMap[y]) rowMap[y] = [];
                    rowMap[y].push(cards[i]);
                }
                var ys = Object.keys(rowMap).map(Number).sort(function(a, b) { return a - b; });
                var rows = [];
                for (var i = 0; i < ys.length; i++) {
                    var row = rowMap[ys[i]];
                    row.sort(function(a, b) { return a.left - b.left; });
                    rows.push(row);
                }
                return rows;
            }

            // Render a row-based configuration, centered in canvas
            function renderConfig(rows) {
                var totalH = rows.length * cardH;
                var startY = (canvasH - totalH) / 2;

                for (var r = 0; r < rows.length; r++) {
                    var row = rows[r];
                    var rowW = row.length * cardW;
                    var rowStartX = (canvasW - rowW) / 2;
                    var rowY = startY + r * cardH;

                    for (var c = 0; c < row.length; c++) {
                        var card = row[c];
                        var newLeft = rowStartX + c * cardW;
                        var newTop = rowY;

                        card.element.style.left = newLeft + 'px';
                        card.element.style.top = newTop + 'px';

                        var xNorm = Math.round(Math.max(0, Math.min(1, newLeft / (canvasW - cardW))) * 1000) / 1000;
                        var yNorm = Math.round(Math.max(0, Math.min(1, newTop / (canvasH - cardH))) * 1000) / 1000;
                        placements[card.id] = { x: xNorm, y: yNorm };
                    }
                }
            }

            function snapAndCenter(card, characterId) {
                var placed = getPlacedCards(card);
                var newCard = { element: card, id: characterId };

                if (placed.length === 0) {
                    renderConfig([[newCard]]);
                    checkAllPlaced();
                    return;
                }

                var rows = groupIntoRows(placed);
                var dropCenterX = parseFloat(card.style.left) + cardW / 2;
                var dropCenterY = parseFloat(card.style.top) + cardH / 2;

                // Direction from cluster center to drop point
                var bbox = getBoundingBox(placed);
                var dx = dropCenterX - bbox.centerX;
                var dy = dropCenterY - bbox.centerY;

                if (Math.abs(dx) > Math.abs(dy)) {
                    // Horizontal approach: join the row closest in Y
                    var closestRowIdx = 0;
                    var closestDist = Infinity;
                    for (var i = 0; i < rows.length; i++) {
                        var rowCenterY = rows[i][0].top + cardH / 2;
                        var dist = Math.abs(dropCenterY - rowCenterY);
                        if (dist < closestDist) {
                            closestDist = dist;
                            closestRowIdx = i;
                        }
                    }
                    // Insert at correct X position within the row
                    var row = rows[closestRowIdx];
                    var insertPos = row.length;
                    for (var j = 0; j < row.length; j++) {
                        if (dropCenterX < row[j].left + cardW / 2) {
                            insertPos = j;
                            break;
                        }
                    }
                    row.splice(insertPos, 0, newCard);
                } else {
                    // Vertical approach: insert as a new row
                    var newRow = [newCard];
                    var insertIdx = rows.length;
                    for (var i = 0; i < rows.length; i++) {
                        var rowCenterY = rows[i][0].top + cardH / 2;
                        if (dropCenterY < rowCenterY) {
                            insertIdx = i;
                            break;
                        }
                    }
                    rows.splice(insertIdx, 0, newRow);
                }

                renderConfig(rows);
                checkAllPlaced();
            }

            function checkAllPlaced() {
                var allDone = placements.red.x !== null &&
                              placements.green.x !== null &&
                              placements.purple.x !== null;
                var explanationEl = display_element.querySelector('#hierarchy-explanation');
                var hasExplanation = explanationEl && explanationEl.value.trim().length > 0;
                submitBtn.disabled = !(allDone && hasExplanation);
            }

            // Re-arrange remaining cards into discrete config when one is picked up
            function rearrangeRemaining(excludeCard) {
                var remaining = getPlacedCards(excludeCard);
                if (remaining.length === 0) return;

                if (remaining.length === 1) {
                    renderConfig([[remaining[0]]]);
                    return;
                }

                // 2 cards: decide vertical or horizontal based on current positions
                var c1 = remaining[0];
                var c2 = remaining[1];
                var adx = Math.abs(c1.left - c2.left);
                var ady = Math.abs(c1.top - c2.top);

                var rows;
                if (ady >= adx) {
                    // More vertical: stack, preserve top/bottom order
                    if (c1.top <= c2.top) {
                        rows = [[c1], [c2]];
                    } else {
                        rows = [[c2], [c1]];
                    }
                } else {
                    // More horizontal: side by side, preserve left/right order
                    if (c1.left <= c2.left) {
                        rows = [[c1, c2]];
                    } else {
                        rows = [[c2, c1]];
                    }
                }

                renderConfig(rows);
            }

            // --- Mouse handlers ---
            function onMouseDown(e) {
                e.preventDefault();
                var card = e.target.closest('.character-card');
                if (!card) return;

                dragging = card;
                card.style.cursor = 'grabbing';
                card.style.zIndex = 100;

                var cardRect = card.getBoundingClientRect();
                dragOffsetX = e.clientX - cardRect.left;
                dragOffsetY = e.clientY - cardRect.top;

                // Clear placement if re-dragging from canvas
                var charId = card.getAttribute('data-character');
                if (card.parentElement === canvasArea) {
                    placements[charId] = { x: null, y: null };
                    rearrangeRemaining(card);
                }

                // If card is in the dock, move it into the canvas
                if (card.parentElement === dock) {
                    card.style.position = 'absolute';
                    card.style.left = (canvasW / 2 - cardW / 2) + 'px';
                    card.style.top = (canvasH / 2 - cardH / 2) + 'px';
                    canvasArea.appendChild(card);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }

            function onMouseMove(e) {
                if (!dragging) return;
                e.preventDefault();

                var canvasRect = getCanvasRect();
                var newLeft = e.clientX - canvasRect.left - dragOffsetX;
                var newTop = e.clientY - canvasRect.top - dragOffsetY;

                newLeft = Math.max(0, Math.min(canvasW - dragging.offsetWidth, newLeft));
                newTop = Math.max(0, Math.min(canvasH - dragging.offsetHeight, newTop));

                dragging.style.left = newLeft + 'px';
                dragging.style.top = newTop + 'px';
            }

            function onMouseUp(e) {
                if (!dragging) return;
                var card = dragging;
                var characterId = card.getAttribute('data-character');
                dragging = null;
                card.style.cursor = 'grab';
                card.style.zIndex = 10;

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                // Check if dropped outside canvas
                var canvasRect = getCanvasRect();
                if (e.clientX < canvasRect.left || e.clientX > canvasRect.right ||
                    e.clientY < canvasRect.top || e.clientY > canvasRect.bottom) {
                    card.style.position = 'relative';
                    card.style.left = '';
                    card.style.top = '';
                    dock.appendChild(card);
                    placements[characterId] = { x: null, y: null };
                    checkAllPlaced();
                    return;
                }

                snapAndCenter(card, characterId);
            }

            // --- Touch handlers ---
            function onTouchStart(e) {
                var touch = e.touches[0];
                var card = e.target.closest('.character-card');
                if (!card) return;
                e.preventDefault();

                dragging = card;
                card.style.cursor = 'grabbing';
                card.style.zIndex = 100;

                var cardRect = card.getBoundingClientRect();
                dragOffsetX = touch.clientX - cardRect.left;
                dragOffsetY = touch.clientY - cardRect.top;

                var charId = card.getAttribute('data-character');
                if (card.parentElement === canvasArea) {
                    placements[charId] = { x: null, y: null };
                    rearrangeRemaining(card);
                }

                if (card.parentElement === dock) {
                    card.style.position = 'absolute';
                    card.style.left = (canvasW / 2 - cardW / 2) + 'px';
                    card.style.top = (canvasH / 2 - cardH / 2) + 'px';
                    canvasArea.appendChild(card);
                }

                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', onTouchEnd);
            }

            function onTouchMove(e) {
                if (!dragging) return;
                e.preventDefault();
                var touch = e.touches[0];
                var canvasRect = getCanvasRect();
                var newLeft = touch.clientX - canvasRect.left - dragOffsetX;
                var newTop = touch.clientY - canvasRect.top - dragOffsetY;
                newLeft = Math.max(0, Math.min(canvasW - dragging.offsetWidth, newLeft));
                newTop = Math.max(0, Math.min(canvasH - dragging.offsetHeight, newTop));
                dragging.style.left = newLeft + 'px';
                dragging.style.top = newTop + 'px';
            }

            function onTouchEnd(e) {
                if (!dragging) return;
                var card = dragging;
                var characterId = card.getAttribute('data-character');
                dragging = null;
                card.style.cursor = 'grab';
                card.style.zIndex = 10;

                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);

                var touch = e.changedTouches[0];
                var canvasRect = getCanvasRect();
                if (touch.clientX < canvasRect.left || touch.clientX > canvasRect.right ||
                    touch.clientY < canvasRect.top || touch.clientY > canvasRect.bottom) {
                    card.style.position = 'relative';
                    card.style.left = '';
                    card.style.top = '';
                    dock.appendChild(card);
                    placements[characterId] = { x: null, y: null };
                    checkAllPlaced();
                    return;
                }

                snapAndCenter(card, characterId);
            }

            // Attach listeners
            cards.forEach(function(card) {
                card.addEventListener('mousedown', onMouseDown);
                card.addEventListener('touchstart', onTouchStart, { passive: false });
            });

            // Explanation textarea listener
            var explanationEl = display_element.querySelector('#hierarchy-explanation');
            if (explanationEl) {
                explanationEl.addEventListener('input', function() { checkAllPlaced(); });
            }

            // Submit
            submitBtn.addEventListener('click', function() {
                var end_time = performance.now();
                var expEl = display_element.querySelector('#hierarchy-explanation');
                var trial_data = {
                    rt: Math.round(end_time - start_time),
                    red_x: placements.red.x,
                    red_y: 1 - placements.red.y,
                    green_x: placements.green.x,
                    green_y: 1 - placements.green.y,
                    purple_x: placements.purple.x,
                    purple_y: 1 - placements.purple.y,
                    explanation: expEl ? expEl.value.trim() : '',
                };

                display_element.innerHTML = '';
                self.jsPsych.finishTrial(trial_data);
            });
        }
    }

    HierarchyRankingPlugin.info = info;
    return HierarchyRankingPlugin;
})(jsPsychModule);
