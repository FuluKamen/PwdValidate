密码验证及确认密码一致性验证组建

示例：

import PwdValidate from '../../Commpent/js/PwdValidate'

 onPwdChange=(value)=>{
    console.log('value11',value)
  }
  onConfirmChange=(value)=>{
    console.log('value222',value)
  }

<PwdValidate format='1' onPwdChange={this.onPwdChange} onConfirmChange={this.onConfirmChange}/>
# -
