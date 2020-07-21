/* prettier-ignore */
/*eslint-disable*/

import React from 'react'

import './css/main.css'
import './css/util.css'

export const Contact = () => (

	<div className="container-contact100">
		<div className="wrap-contact100">
			<form className="contact100-form validate-form">
				<span className="contact100-form-title">
					Contact Us
				</span>

				<div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
					<span className="label-input100">FULL NAME *</span>
					<input className="input100" type="text" name="name" placeholder="Enter Your Name"/>
				</div>

				<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
					<span className="label-input100">Email *</span>
					<input className="input100" type="text" name="email" placeholder="Enter Your Email "/>
				</div>

				<div className="wrap-input100 bg1 rs1-wrap-input100">
					<span className="label-input100">Phone</span>
					<input className="input100" type="text" name="phone" placeholder="Enter Number Phone"/>
				</div>

				<div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
					<span className="label-input100">Message</span>
					<textarea className="input100" name="message" placeholder="Your message here..."></textarea>
				</div>

				<div className="container-contact100-form-btn">
					<button className="contact100-form-btn">
						<span>
							Submit
							<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
)