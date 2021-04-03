import { itodo } from './itodo';

export class Todo implements itodo {
    constructor(
        public id: string,
        public title: string,
        public start: Date,
        public end: Date,
        public status: string
    ) { }

}
