export interface IUserBasicDetails{
 id:string
 name:string,
 imagePath?:string
}

export interface IUser extends IUserBasicDetails{
  email:string
}

export interface ICreatUser{
  firstName:string
  lastName:string
  email:string
  image?:string
}
