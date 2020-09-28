import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    ADMIN = 'ADMIN',
    TRAINER = 'TRAINER',
    TRAINEE = 'TRAINEE',
    GUEST = 'GUEST'
}

export enum AppResources {
    USER = 'USER',
    TOPIC = 'TOPIC',
    POST = 'POST'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // Resource USER
    .grant(AppRoles.GUEST)
    .readAny(AppResources.USER, '*, !email, !roles, !password, !createdAt, !updatedAt')
    .createAny(AppResources.USER, '*, !roles')
    .grant(AppRoles.TRAINEE)
    .readAny(AppResources.USER, '*, !password')
    .updateOwn(AppResources.USER)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .createAny(AppResources.USER)
    .readAny(AppResources.USER)
    .updateAny(AppResources.USER)
    .deleteAny(AppResources.USER)

    // Resource POST
    .grant(AppRoles.GUEST)
    .readAny(AppResources.POST)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .createAny(AppResources.POST)
    .updateOwn(AppResources.POST)
    .deleteOwn(AppResources.POST)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .readAny(AppResources.POST)
    .createAny(AppResources.POST)
    .updateAny(AppResources.POST)
    .deleteAny(AppResources.POST);