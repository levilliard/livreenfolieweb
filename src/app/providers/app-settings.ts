import { User } from "../models/models";


export class AppSettings {
    //public static URL_BASE = 'http://localhost:5000/api';
    //http://200.4.164.52/livreenfolie/api/Pays
    //public static URL_BASE = 'http://200.4.164.52/livreenfolie/api' 
    //public static URL_BASE = 'http://200/livreenfolie/api' 
    public static URL_BASE = 'http://localhost:8080/bank/api' 
    public static URL_BASE_LOCAL = 'http://192.168.2.120/livreenfolie/api' 
    //public static URL_BASE = 'http://192.168.2.206:5050/api' 
    public static IS_LOGIN = false;
    public static IS_REGISTERED = true;
    public static MAX_DATA = 0;
    public static DEFAULT_USER: User = new User()

    constructor(){
    }
}
