import { MEASURING_COUNT } from "./consts.js";

/**
 * Utility class that measures FPS and Memory Usage.
 */
export class FPS {
    /**
     * Start measuring FPS and memory
     */
    static start() {
        this.start = null;
        this.frameCount = 0;
        this.running = true;
        this.frames = [];
        this.prevFrameTime = null;
        this.memoryStart = null; // Начальная память

        // Record initial memory value if the API is available
        if (window.performance && window.performance.memory) {
            this.memoryStart = window.performance.memory.usedJSHeapSize / 1024 / 1024; // В MB
        }

        console.log('Starting frame counter and memory measurement');

        requestAnimationFrame(this.frameCounter);
    }

    /**
     * Stop measuring and print the result to console, including memory usage
     */
    static stop() {
        this.running = false;

        const elapsed = performance.now() - this.start;
        const sum = this.frames.reduce((sum, time) => sum + time, 0); 
        const average = this.frames.length / (sum / 1000);
        const fps = this.frameCount / (elapsed / 1000);
        let memoryUsage = null;

        // Calculate final memory value and the difference
        if (window.performance && window.performance.memory) {
            const memoryEnd = window.performance.memory.usedJSHeapSize / 1024 / 1024; // In MB
            if (this.memoryStart !== null) {
                memoryUsage = memoryEnd - this.memoryStart; // Difference in MB
            }
        }

        setTimeout(() => {
            let currentMeasuring = Number(sessionStorage.getItem('measuring') || 0);
            const results = JSON.parse(sessionStorage.getItem('results')) || [];

            currentMeasuring += 1;
            results.push({
                initial: window.initialTime,
                elapsed,
                frames: this.frameCount,
                sum,
                fps,
                average,
                memoryUsage: memoryUsage !== null ? memoryUsage : 'N/A' // Save memory or 'N/A'
            });

            if (currentMeasuring < MEASURING_COUNT) {
                sessionStorage.setItem('measuring', String(currentMeasuring));
                sessionStorage.setItem('results', JSON.stringify(results));
                location.reload();
            } else {
                if (MEASURING_COUNT > 0) {
                    let averageResult = results.reduce((obj, item) => {
                        Object.keys(item).forEach(prop => {
                            obj[prop] = (obj[prop] || 0) + (typeof item[prop] === 'number' ? item[prop] : 0);
                        });
                        return obj;
                    }, {});

                    Object.keys(averageResult).forEach(prop => {
                        if (typeof averageResult[prop] === 'number') {
                            averageResult[prop] = averageResult[prop] / MEASURING_COUNT;
                        }
                    });

                    console.log('All results for every measuring');
                    console.log(results);

                    console.log(`Average results for ${currentMeasuring} measuring(s)`);
                    console.table({
                        'Initial rendering (ms)': averageResult.initial,
                        'Elapsed time (ms)': averageResult.elapsed,
                        'Frames': averageResult.frames,
                        'Frame sum (ms)': averageResult.sum,
                        'Average FPS 1': averageResult.fps,
                        'Average FPS 2': averageResult.average,
                        'Memory Usage (MB)': averageResult.memoryUsage !== 'N/A' ? averageResult.memoryUsage : 'N/A'
                    });

                    sessionStorage.removeItem('measuring');
                    sessionStorage.removeItem('results');
                }
            }
        }, 1000);
    }

    // Internal function that counts animation frames
    static frameCounter() {
        const time = performance.now();

        if (FPS.start === null) {
            FPS.start = time;
            FPS.prevFrameTime = time;
        } else {
            FPS.frameCount++;
            FPS.frames.push(time - FPS.prevFrameTime);
        }

        FPS.prevFrameTime = time;

        if (FPS.running) {
            requestAnimationFrame(FPS.frameCounter);
        }
    }
}

/**
 * Utility class that measures initial rendering time (actually it times whatever).
 */
export class RenderTimer {
    static start({ sync = true, callback }) {
        this.start = performance.now();
        this.running = true;

        console.log('Starting initial rendering measurement');

        callback && callback();
        if (sync) this.stop();
    }

    static stop() {
        if (this.running) {
            const elapsed = performance.now() - this.start;
            window.initialTime = elapsed;

            console.table({
                'Initial rendering (ms)': elapsed
            });

            this.running = false;
        }
    }
}

/**
 * Utility class that scrolls an element a predetermined distance by updating its `scrollTop` on a timer
 */
export class Scroller {
    static scroll({ element, distance = 50000, speed = 5, maxSpeed = 1000, acceleration = 1, callback, scrollFn }) {
        let scrollTop = 0;

        console.log('Starting to scroll', element);

        const intervalId = setInterval(() => {
            if (scrollFn) {
                scrollFn(scrollTop);
            } else {
                element.scrollTop = scrollTop;
            }

            scrollTop += speed;

            if (speed < maxSpeed) {
                speed += acceleration;
            }

            if (scrollTop > distance) {
                clearInterval(intervalId);
                console.log('Finished scrolling');
                callback && callback();
            }
        }, 1);
    }
}

/**
 * Utility class to generate tree-like data
 */
export class TreeGenerator {
    static generate({ nodeCount, depth, childrenProperty }) {
        const allNodes = [];
        let count = 0;

        function generateChildren(curDepth, parentId) {
            const children = [];
            const leafs = curDepth === depth;

            for (let i = 0; i < 5; i++) {
                count++;
                if (count > nodeCount) return children;

                const node = {
                    id: count,
                    name: (leafs ? 'File ' : 'Folder ') + count,
                    parentId,
                    expanded: true,
                    open: true,
                    number1: count % 2,
                    number2: count % 3,
                    number3: count % 4,
                    number4: count % 5,
                    number5: count % 6,
                    number6: count % 7,
                    number7: count % 8,
                    number8: count % 9,
                    number9: count % 10,
                    number10: count % 11,
                    number11: count % 12,
                    number12: count % 13,
                    number13: count % 14,
                    number14: count % 15,
                    number15: count % 16,
                    number16: count % 17,
                    number17: count % 18,
                    number18: count % 19,
                    number19: count % 20,
                    number20: count % 21,
                    [leafs ? 'leaf' : childrenProperty]: leafs ? true : generateChildren(curDepth + 1, count)
                };

                children.push(node);
                allNodes.push(node);
            }

            return children;
        }

        return { tree: generateChildren(0), allNodes };
    }
}