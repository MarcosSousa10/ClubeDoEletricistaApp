/* eslint-disable no-fallthrough *//* eslint-disable prettier/prettier */
import axios, { AxiosRequestConfig } from 'axios';
import { MethodEnum } from '../../../enums/methods.enum';
import { getAuthorizationToken } from './auth';

export type MetgoType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export default class ConnectionAPI {
    static async call<T, B = unknown>(url: string, method: MetgoType, body?: B): Promise<T> {
        const token = await getAuthorizationToken();
        const config : AxiosRequestConfig = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        };
        switch (method) {
            case MethodEnum.DELETE:
            case MethodEnum.GET:
                return (await axios[method]<T>(url, config)).data;
            case MethodEnum.PATCH:
            case MethodEnum.POST:
            case MethodEnum.PUT:

            default:
                return (await axios[method]<T>(url, body)).data;

        }
    }
    static async connect<T, B = unknown >(url: string, method: MetgoType, body?: B): Promise<T>{
        return this.call<T>(url,method,body).catch((error) =>{
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                    case 403:
                        throw new Error( 'Sem Permissão');
                    default:
                        throw new Error( 'Sem Internet');
                }
            }
            throw new Error( 'Sem Internet');
        });
    }
}
export const connectionAPIGet = async <T>(url: string): Promise<T> =>{
    return ConnectionAPI.connect(url, MethodEnum.GET);
  };
export const connectionAPIPost = async <T, B = unknown>(url: string, body: B): Promise<T> =>{
    return ConnectionAPI.connect(url, MethodEnum.POST, body);
  };
export const connectionAPIDelete = async <T>(url: string ): Promise<T> =>{
    return ConnectionAPI.connect(url, MethodEnum.DELETE);
  };
export const connectionAPIPut = async <T, B = unknown>(url: string, body: B): Promise<T> =>{
    return ConnectionAPI.connect(url, MethodEnum.PUT, body);
  };
export const connectionAPIPatch = async <T, B = unknown >(url: string, body: B): Promise<T> =>{
    return ConnectionAPI.connect(url, MethodEnum.PATCH, body);
  };
