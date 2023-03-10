import { injectable, inject } from 'inversify';
// import { Api } from 'src/api/api';
import { TYPES } from 'src/iocTypes';
import { Account } from './account.model';
import { IProxyField, ProxyField } from './proxyField';

@injectable()
export class CreateAcoountController {
  constructor(
    // @inject(TYPES.Api) private apiService: Api,
    @inject(TYPES.Account) private accountModel: Account,
  ) { }

  emailField: IProxyField = new ProxyField({
    getter: () => this.accountModel.email,
    validator: this.validateEmail,
  });

  usernameField: IProxyField = new ProxyField({
    getter: () => this.accountModel.username,
  });

  passwordField: IProxyField = new ProxyField({
    getter: () => this.accountModel.password,
  });

  private validateEmail(val: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) return 'Invalid email';
  }

  updateModelValue(key: keyof Account, value: string) {
    this.accountModel[key] = value;
  }

  onSubmit() { }
}
