export interface ServerResponseToAddSecret {
  external_id: string;
  filename: string;
  recipient: {
    email: string;
    name: string;
  };
}

export interface AllSecretsFromBackend {
  external_id: string;
  content: string;
  filename: string;
  recipient: {
    name: string;
    email: string;
  };
  download_url: string;
  created_at: Date;
}
