import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { Auth, AuthDocument } from './schemas/auth.schema';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authModel;
    constructor(authModel: Model<AuthDocument>);
    validate(payload: any): Promise<import("mongoose").Document<unknown, {}, AuthDocument> & Auth & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
