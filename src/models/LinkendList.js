import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.iterations = 0; 
    }

    insert(data) {
        let count = 0; 
        data.forEach(item => {
            const newNode = new Node(item);
            count++; 
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        });
        this.iterations = count; 
    }

    print() {
        let current = this.head;
        const items = [];
        while (current) {
            items.push(current.data);
            current = current.next;
        }
        console.log(items);
    }

    search(name) {
        this.iterations = 0; 
        let current = this.head;
        while (current) {
            this.iterations++;
            if (current.data.name === name) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    sort(algorithm) {
        this.iterations = 0; 
        if (algorithm === 'Bubble sort') {
            this.bubbleSort();
        } else if (algorithm === 'Merge sort') {
            this.head = this.mergeSort(this.head);
        } else if (algorithm === 'Radix sort') {
            this.radixSort();
        }
    }

    radixSort() {
        const max = this.getMax();
        let exp = 1;
        let radixSortIterations = 0; 
    
        while (Math.floor(max / exp) > 0) {
            this.countingSort(exp);
            radixSortIterations++; 
            exp *= 10;
        }
    
        this.iterations += radixSortIterations; 
    }

    getMax() {
        let max = 0;
        let current = this.head;
        while (current) {
            if (current.data.postal_code > max) {
                max = current.data.postal_code;
            }
            current = current.next;
        }
        return max;
    }

    countingSort(exp) {
        const output = [];
        const count = Array(10).fill(0);
        let localIterations = 0; 
    
        let current = this.head;
        while (current) {
            localIterations++; 
            count[Math.floor(current.data.postal_code / exp) % 10]++;
            current = current.next;
        }
    
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
    
        current = this.head;
        while (current) {
            const index = Math.floor(current.data.postal_code / exp) % 10;
            output[count[index] - 1] = current.data;
            count[index]--;
            current = current.next;
            localIterations++; 
        }
    
        let i = 0;
        current = this.head;
        while (current) {
            current.data = output[i++];
            current = current.next;
            localIterations++;
        }
    
        this.iterations += localIterations; 
    }

    bubbleSort() {
        let swapped;
        let totalIterations = 0; 
        do {
            swapped = false;
            let current = this.head;
            while (current && current.next) {
                totalIterations++;
                if (current.data.postal_code > current.next.data.postal_code) {
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
        this.iterations = totalIterations; 
    }
    

    mergeSort(head) {
        this.iterations++;
        if (!head || !head.next) return head;

        let middle = this.getMiddle(head);
        let nextOfMiddle = middle.next;
        middle.next = null;

        let left = this.mergeSort(head);
        let right = this.mergeSort(nextOfMiddle);

        return this.merge(left, right);
    }

    getMiddle(head) {
        if (!head) return head;

        let slow = head;
        let fast = head.next;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }

    merge(left, right) {
        if (!left) return right; // Si la lista izquierda está vacía, retorna la lista derecha
        if (!right) return left; // Si la lista derecha está vacía, retorna la lista izquierda
    
        // Si el primer elemento de la lista izquierda es menor o igual al de la derecha,
        // el primer elemento de la lista izquierda debe ir primero
        if (left.data.postal_code <= right.data.postal_code) {
            left.next = this.merge(left.next, right);
            return left;
        } else {
            right.next = this.merge(left, right.next);
            return right;
        }
    }

    getItems() {
        const items = [];
        let current = this.head;
        while (current) {
            items.push(current.data);
            current = current.next;
        }
        return items;
    }

    getIterations() {
        return this.iterations;
    }
}

export default LinkedList;
