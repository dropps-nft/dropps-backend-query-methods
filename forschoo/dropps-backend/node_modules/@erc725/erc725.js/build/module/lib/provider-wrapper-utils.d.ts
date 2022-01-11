import { JsonRpc } from '../types/JsonRpc';
import { Method } from '../types/Method';
export declare function decodeResult(method: Method, result: any): any;
export declare function constructJSONRPC(address: string, method: Method, methodParam?: string): JsonRpc;
