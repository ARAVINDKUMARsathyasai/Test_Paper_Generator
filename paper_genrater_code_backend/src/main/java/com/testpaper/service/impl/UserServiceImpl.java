package com.testpaper.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testpaper.model.User;
import com.testpaper.repository.UserRepository;
import com.testpaper.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	
	@Override
	public User createUser(User user) {
		User local=this.userRepo.findByEmail(user.getEmail());
		if(local!=null) {
			System.out.println("Email with ");
			throw new RuntimeException("User with this mail exist");
		}
		else {
			local = this.userRepo.save(user);
		}
		return local;
	}


	@Override
	public User findByUsername(String username) {
		User user;
		user = this.userRepo.findByUsername(username);
		if(user !=null)
			return user;
		else
			return this.findByEmail(username);
	}
	
	public User findByEmail(String email) {
		User user; 
		user= this.userRepo.findByEmail(email);
		if(user !=null)
			return user;
		else
			return this.findByPhoneNo(email);
	}

	public User findByPhoneNo(String phoneNo) {
		User user;
		user= this.userRepo.findByPhoneNo(phoneNo);
	    return user;
	}
  
	@Override
	public void deleteUser(Long userId) {
		this.userRepo.deleteById(userId);
	}

	@Override
	public Optional<User> findByUserId(Long userID) {

		return this.userRepo.findById(userID);
	}


	@Override
	public List<User> getAllUsers() {
		return  userRepo.findAll();
	}


	@Override
	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}
}
