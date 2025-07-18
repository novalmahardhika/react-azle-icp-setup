import { IDL, query, msgCaller } from 'azle';

export default class {
  @query([], IDL.Text)
  whoami(): string {
    const caller = msgCaller()
    return caller.toText();
  }
}
