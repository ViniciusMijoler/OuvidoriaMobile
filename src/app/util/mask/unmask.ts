export class Unmask {

    static number (value: string) {
        value.replace(/[^\d]/, '');
    }

}
