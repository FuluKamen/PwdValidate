import React, { Component  } from 'react'
import { Input } from 'antd'
import '../less/pwd.less'

export default class PwdValidate extends Component{
  constructor(props) {
    super(props);
    const value = this.props.value || '';
    this.state = {
      value: value,
      errpwdmsg:'',
      errconfirmmsg:'',
      pwd:'',
      pwdConfirm:'',
    };
  }
 componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { value } = nextProps;
    if (props.value !== value) {
      this.setState({
         value,
      });
    }
  }
  handlePwdOnblur = (e,callback) => {
     this.handleOnblur(e,callback,'pwd')
  }
  handleConfirmOnblur = (e,callback) => {
     this.handleOnblur(e,callback,'confirmpwd')
  }
  handleOnblur = (e,callback,parameter) => {
     const { validType } = this.props
     let value = e.target.value.trim()
     if(parameter==='pwd'){
          var regex = /^\s*$/g ;
          if (regex.test(value)) {
              this.setState({
                errpwdmsg:this.props.errpwdmsg ? this.props.errpwdmsg : '请输入有效的密码！'
            })
          } else {
            this.setState({
                errpwdmsg:''
            })
          }
     }
    if (callback) {
      callback(value)
    }
  }
  handlePwdChange = (e,callback)=>{
     this.handleChange(e,callback,'pwd');
  }
  handleConfirmChange = (e,callback)=>{
     if(!e.target.value || e.target.value!==this.state.pwd){
       this.setState({
          errconfirmmsg:this.props.errconfirmmsg ? this.props.errconfirmmsg : '两次输入密码不一致！'
       })
     }else{
       this.setState({
          errconfirmmsg:''
       })
     }
     this.handleChange(e,callback,'confirmpwd');

  }
  handleChange = (e,callback,parameter) => {
    const { validType } = this.props
    const value = e.target.value;
    if(parameter==='pwd'){
      this.setState({ pwd:value });
    }else{
      this.setState({ pwdConfirm:value });
    }

    if (callback) {
      callback(e.target.value.trim())
    }
    this.triggerChange(value,parameter);

  }
  handlePwdFocus =(e,callback) => {
     this.handleFocus(e,callback,'pwd')
  }
  handleConfirmFocus =(e,callback) => {
     this.handleFocus(e,callback,'confirmpwd')
  }
  handleFocus =(e,callback,parameter) => {
    const { validType } = this.props
    if(validType==='clearpwd'){
       if(parameter==='pwd'){
         this.setState({pwd:''})
       }else{
         this.setState({pwdConfirm:''})
       }

    }
  }
  triggerChange = (changedValue,parameter) => {
    const onChange = parameter==='pwd' ? this.props.onPwdChange : this.props.onConfirmChange;
    if (onChange) {
      onChange(changedValue);
    }
  }


  render() {
    const { placeholder,format } = this.props;
    const { value,pwd,pwdConfirm } = this.state
    console.log('format',format,format==='1')
    return (
       <div className='pwdValidate'>
        { format==='1'?
          <div>
             <div className='inputvalidate'>
              <Input
                  addonBefore={<label className='labelpwd'>密码</label>}
                  value={pwd}
                  onChange={(e) => { this.handlePwdChange(e, this.props.onPwdChange)}}
                  onBlur={(e) => { this.handlePwdOnblur(e, this.props.onPwdBlur)}}
                  onFocus={(e) =>{this.handlePwdFocus(e, this.props.onPwdFocus)}}
                  placeholder='请输入密码'
                  {...this.props}
                />
                <div className="input-explain">{this.state.errpwdmsg}</div>
            </div>

            <div className='inputvalidate'>
              <Input
                  addonBefore={<label className='labelpwdconfirm'>确认密码</label>}
                  value={pwdConfirm}
                  onChange={(e) => { this.handleConfirmChange(e, this.props.onConfirmChange)}}
                  onBlur={(e) => { this.handleConfirmOnblur(e, this.props.onConfirmBlur)}}
                  onFocus={(e) =>{this.handleConfirmFocus(e, this.props.onConfirmFocus)}}
                  placeholder='请再次输入密码'
                  {...this.props}
                />
                <div className="input-explain">{this.state.errconfirmmsg}</div>
            </div>
          </div>
          :
          <div>
            <div className='inputvalidate'>
              <span>密码：</span>
              <Input
                  value={pwd}
                  onChange={(e) => { this.handlePwdChange(e, this.props.onPwdChange)}}
                  onBlur={(e) => { this.handlePwdOnblur(e, this.props.onPwdBlur)}}
                  onFocus={(e) =>{this.handlePwdFocus(e, this.props.onPwdFocus)}}
                  placeholder='请输入密码'
                  {...this.props}
                />
                <div className="input-explain">{this.state.errpwdmsg}</div>
            </div>

            <div className='inputvalidate'>
              <span>确认密码：</span>
              <Input
                  value={pwdConfirm}
                  onChange={(e) => { this.handleConfirmChange(e, this.props.onConfirmChange)}}
                  onBlur={(e) => { this.handleConfirmOnblur(e, this.props.onConfirmBlur)}}
                  onFocus={(e) =>{this.handleConfirmFocus(e, this.props.onConfirmFocus)}}
                  placeholder='请再次输入密码'
                  {...this.props}
                />
                <div className="input-explain">{this.state.errconfirmmsg}</div>
            </div>
          </div>
        }
    </div>
    );
  }
}
