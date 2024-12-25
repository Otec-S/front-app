export interface ServerResponseToAddSecret {
  external_id: string;
  filename: string;
  recipient: {
    email: string;
    name: string;
  };
}
