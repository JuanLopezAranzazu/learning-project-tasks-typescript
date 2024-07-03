export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type RawUser = {
  _id: string;
} & UserData;

export type LoginData = {
  email: string;
  password: string;
};
