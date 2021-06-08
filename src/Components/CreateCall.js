import React, { Fragment, useState } from "react";
import { Form, Input, Button, Checkbox, Select } from 'antd';
const { Option } = Select;

const FormPage = ({ userDetails, setUserDetails, makeCall }) => {

  const [countryCodeFrom, setCountryCodeFrom] = useState(userDetails.countryCodeFrom);
  const [countryCodeTo, setCountryCodeTo] = useState(userDetails.countryCodeTo);
  const [time, setTime] = useState(userDetails.time);

  const layout = {
    labelCol: { span: 14 },
    wrapperCol: { span: 100 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    values.countryCodeFrom = countryCodeFrom;
    values.countryCodeTo = countryCodeTo;
    values.time = time;
    values.to = countryCodeTo + values.phoneNumberTo;
    values.from = countryCodeFrom + (values.phoneNumberFrom ? values.phoneNumberFrom : userDetails.from);
    values.name = values.name;
    setUserDetails({
      ...userDetails,
      ...values
    })
    makeCall(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCountryCodeFrom = (value) => {
    setUserDetails({
      ...userDetails,
      countryCodeFrom: value
    })
    setCountryCodeFrom(value);
    return;
  }

  const handleCountryCodeTo= (value) => {
    setUserDetails({
      ...userDetails,
      countryCodeTo: value
    })
    setCountryCodeTo(value);
    return;
  }

  const handleTime= (value) => {
    setUserDetails({
      ...userDetails,
      time: value
    })
    setTime(value);
    return;
  }  

  const prefixSelectorFrom = (
    <Form.Item name="countryCodeFrom" noStyle>
      <Select defaultValue={countryCodeFrom} style={{ width: 67 }} onChange={handleCountryCodeFrom}>
        <Option value="+91">+91</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );

  const prefixSelectorTo = (
    <Form.Item name="countryCodeTo" noStyle>
      <Select defaultValue={countryCodeTo} style={{ width: 67 }} onChange={handleCountryCodeTo}>
        <Option value="+91">+91</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );


  return (
    //   <Fragment>
    // {/* <MDBContainer>
    //   <br/> <br/> <br/> <br/>
    //   <MDBRow>
    //     <MDBCol md="6"> */}
    //       <form onSubmit={handleSubmit}>
    //         <p className="h4 text-center mb-4">Enter Details of the call</p>
    //         <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
    //           Your name
    //         </label>
    //         <input type="text" name="username" className="form-control" value={userDetails.username} onChange={handleChange} />
    //         <br />
    //         <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
    //           Phone Number to call:
    //         </label>
    //         <input type="text" name="to" className="form-control" value={userDetails.to} onChange={handleChange} />
    //         <br />
    //         <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
    //           Duration of call:
    //         </label>
    //         <select name="time" value={userDetails.time} onChange={handleChange}>
    //           <option value={10}>5 Minutes</option>
    //           <option value={600}>10 Minutes</option>
    //           <option value={900}>15 Minutes</option>
    //         </select>
    //         <div className="text-center mt-4">
    //           <button color="unique" type="submit">
    //             Make a call
    //           </button>
    //         </div>
    //       </form>
    //     {/* </MDBCol>
    //   </MDBRow>
    // </MDBContainer> */}
    // </Fragment>
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Your Plivo Phone Number"
        name="phoneNumberFrom"
        
        rules={[
          {
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input addonBefore={prefixSelectorFrom} />
      </Form.Item>
      <Form.Item
        label="Phone Number to call"
        name="phoneNumberTo"
        
        rules={[
          {
            required: true,
            message: 'Please input phone number to call!',
          },
        ]}
      >
        <Input addonBefore={prefixSelectorTo} />
      </Form.Item>
      <Form.Item label="Select call time" name="time" >
      <Select defaultValue={time} style={{ width: 100 }} onChange={handleTime}>
        <Option value={30}>30 sec</Option>
        <Option value={300}>5 min</Option>
        <Option value={600}>10 min</Option>
        <Option value={900}>15 min</Option>
      </Select>
    </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormPage;