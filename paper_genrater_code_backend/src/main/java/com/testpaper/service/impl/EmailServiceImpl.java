package com.testpaper.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

import com.testpaper.service.EmailService;

import jakarta.mail.internet.MimeMessage;


@Service
public class EmailServiceImpl implements EmailService {

	@Value("${spring.mail.username}")
	private String fromEmail;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Override
	public void sendMail(String username,String email, String password) {
		try {
			
			String loginUrl = "http://localhost:3000/userLogin";

			String emailBody = "<html>" +
			        "<body>" +
			        "<p>Congratulations! We have successfully created your account.</p>" +
			        "<p>This is your password: <strong>" + password + "</strong></p>" +
			        "<p>Username: " + email + "</p>" +
			        "<p>Password: " + password + "</p>" +
			        "<p>Use these credentials to access your account.</p>" +
			        "<p>Thanks and regards,</p>" +
			        "<p>TPG</p>" +
			        "<p>testpapergenerator@gmail.com</p>" +
			        "<p>Admin</p>" +
			        "<div style=\"text-align: center;\">" +
			        "<a href=\"" + loginUrl + "\" style=\"display: inline-block; background-color: blue; color: white; text-decoration: none; padding: 10px 20px; border-radius: 20px; border: 2px solid blue;\">" +
			        "Click here to login" +
			        "</a>" +
			        "</div>" +
			        "</body>" +
			        "</html>";


			
			MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
			mimeMessageHelper.setFrom(fromEmail);
			mimeMessageHelper.setTo(email);
			mimeMessageHelper.setSubject("Your Login Creadtiantials from TPG page");

//			mimeMessageHelper.setText(emailBody, true);
			mimeMessage.setContent(emailBody, "text/html; charset=utf-8");
			
			
			javaMailSender.send(mimeMessage);
			
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
	}

}
