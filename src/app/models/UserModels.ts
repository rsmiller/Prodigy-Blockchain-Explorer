export class CreateUserCommand
{
    username: string;
    password: string;
}

export class CreateUserResponseWrapper
{
    success: boolean;
    exception: string;
    data: CreateUserResponse;
}

export class CreateUserResponse
{
    user: UserDto;
    session_id: string;
}

export class UserDto
{
    user_id: number;
    wallet_address: string;
}

export class GetUserResponse
{
    success: boolean;
    exception: string;
    data: UserDto;
}

export class LoginUserCommand
{
    username: string;
    password: string;
}