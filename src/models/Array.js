class ArrayCustom {
    constructor() {
        this.items = [];
        this.iterations = 0; // Añadido para contar iteraciones
    }

    insert(data) {
        if (Array.isArray(data)) {
            this.items.push(...data);
           
        } else {
            console.error('Data debe ser un arreglo.');
        }
    }

    print() {
        console.log(this.items);
    }

    search(name) {
        let i =0;
        this.iterations = 0; 
        const result = this.items.find((item, index) => {
           i++;
            return item.name === name;
        });
        this.iterations=i;
        return result;
    }

    sort(algorithm) {
        this.iterations = 0; // Reiniciar el contador de iteraciones
        if (algorithm === 'Bubble sort') {
            this.bubbleSort();
        } else if (algorithm === 'Merge sort') {
            this.items = this.mergeSort(this.items);
        } else if (algorithm === 'Radix sort') {
            this.radixSort();
        }
    }

    bubbleSort() {
        for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items.length - i - 1; j++) {
                this.iterations++;
                if (this.items[j].name > this.items[j + 1].name) {
                    [this.items[j], this.items[j + 1]] = [this.items[j + 1], this.items[j]];
                }
            }
        }
    }

    mergeSort(arr) {
        this.iterations = 0; // Reiniciar el contador de iteraciones
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
        return this.merge(left, right);
    }

    merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            this.iterations++;
            if (left[leftIndex].name < right[rightIndex].name) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    radixSort() {
        const max = Math.max(...this.items.map(item => item.postal_code));
        let exp = 1;
        while (Math.floor(max / exp) > 0) {
            this.countingSort(exp);
            exp *= 10;
        }
    }

    countingSort(exp) {
        const output = [];
        const count = Array(10).fill(0);
        for (let i = 0; i < this.items.length; i++) {
            this.iterations++;
            count[Math.floor(this.items[i].postal_code / exp) % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (let i = this.items.length - 1; i >= 0; i--) {
            const index = Math.floor(this.items[i].postal_code / exp) % 10;
            output[count[index] - 1] = this.items[i];
            count[index]--;
        }
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = output[i];
        }
    }

    getItems() {
        return this.items;
    }

    getIterations() {
        return this.iterations;
    }
}


export default ArrayCustom;