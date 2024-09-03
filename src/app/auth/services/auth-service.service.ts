import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Amplify } from 'aws-amplify';
import {
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  getCurrentUser,
  signInWithRedirect,
  fetchUserAttributes,
  resendSignUpCode,
  type ConfirmSignUpOutput,
  type ConfirmSignUpInput,
  type SignInInput,
  type SignInOutput,
  type SignUpInput,
  type SignUpOutput,
  ResendSignUpCodeInput,
  ResendSignUpCodeOutput,
  AuthUser,
} from 'aws-amplify/auth';

import { AuthState } from '@auth/interfaces/auth.interface';
import { environment } from '../../../environments/environments';

const initialAuthState: AuthState = {
  isLoggedIn: false,
  username: null,
  email: null,
  name: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authState = new BehaviorSubject<AuthState>(initialAuthState);

  readonly auth$ = this.authState.asObservable();

  readonly isLoggedIn$ = this.auth$.pipe(map((state) => state.isLoggedIn));

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          ...environment.cognito,
          loginWith: {
            oauth: {
              ...environment.cognito.loginWith.oauth,
              providers: ['Google'],
              responseType: 'code',
              scopes: [
                'openid',
                'email',
                'profile',
                'aws.cognito.signin.user.admin',
              ],
            },
          },
        },
      },
    });
  }

  public signUpUser(signUpInput: SignUpInput): Promise<SignUpOutput> {
    return signUp(signUpInput).catch((e) => {
      throw e;
    });
  }

  public confirmSignUp(
    confirmSignUpInput: ConfirmSignUpInput,
  ): Promise<ConfirmSignUpOutput> {
    return confirmSignUp(confirmSignUpInput).catch((e) => {
      throw e;
    });
  }

  public resendSignUpCode(
    resendSignUpCodeInput: ResendSignUpCodeInput,
  ): Promise<ResendSignUpCodeOutput> {
    return resendSignUpCode(resendSignUpCodeInput).catch((e) => {
      throw e;
    });
  }

  public signInUser(signInInput: SignInInput): Promise<SignInOutput | void> {
    return signIn(signInInput)
      .then((res) => {
        if (res.isSignedIn) {
          this.setUserData();
          return;
        }

        throw new Error('Should confirm password');
      })
      .catch((e) => {
        throw e;
      });
  }

  public signInWithGoogle() // signInInput: SignInInput,
  : Promise<SignInOutput | void> {
    return signInWithRedirect({
      provider: 'Google',
    })
      .then(() => {
        this.setUserData();
      })
      .catch((e) => {
        throw e;
      });
  }

  public signOutUser(): Promise<void> {
    return signOut()
      .then(() => {
        this.authState.next(initialAuthState);
      })
      .catch((e) => {
        throw e;
      });
  }

  public validateCurrentSession = () => {
    getCurrentUser().then(
      () => this.setUserData(),
      () => this.authState.next(initialAuthState),
    );
  };

  private async setUserData(): Promise<AuthUser | void> {
    return getCurrentUser().then(({ username }) => {
      fetchUserAttributes().then((data) => {
        this.authState.next({
          isLoggedIn: true,
          username,
          name: data.name ?? '',
          email: data.email ?? '',
        });
      });
    });
  }
}
