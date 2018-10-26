export class Setting {
    constructor(
        public schPostTime: string,
        public schStart: string,
        public schEnd: string,
        public autoPost: boolean,
        public lineChannelSecret: string,
        public lineChannelToken: string,
        public lineUserId: string,
      ) {}
}