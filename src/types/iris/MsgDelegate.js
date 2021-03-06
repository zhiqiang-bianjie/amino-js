import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress,Coin} from '../type'

export class MsgDelegate extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
    this.validatorAddr = properties.validatorAddr || new AccAddress()
    this.delegation = properties.delegation || new Coin()
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      delegation: delegation
    })
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error('validatorAddr is empty')
    }

    if (Utils.isEmpty(this.delegation)) {
      throw new Error('delegation must great than 0')
    }
  }

  toJSON () {
    return {
      delegator_addr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
      validator_addr: new AccAddress(this.validatorAddr).toString(config.iris.bech32.valAddr),
      delegation: this.delegation
    }
  }

  static getType() {
    return "irishub/stake/MsgDelegate"
  }
}
