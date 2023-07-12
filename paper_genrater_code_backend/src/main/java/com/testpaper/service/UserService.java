package com.testpaper.service;

import java.util.List;
import java.util.Optional;

import com.testpaper.model.User;

public interface UserService {
	
	//creating the new user
	public User createUser(User user);
	
	//getting the user by username
	public User findByUsername(String username);
	
	public List<User> getAllUsers();
	
	//delete user by id
	public void deleteUser(Long userId);
	
	//find by id
	public Optional<User> findByUserId(Long userID);

	public User getUserByEmail(String email);
	
}
