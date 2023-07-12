package com.testpaper.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testpaper.Exception.UserNotFoundException;
import com.testpaper.helper.TestCountResponse;
import com.testpaper.model.User;
import com.testpaper.repository.QuestionRepository;
import com.testpaper.repository.SubjectRepository;
import com.testpaper.repository.TestRepository;
import com.testpaper.repository.UserRepository;
import com.testpaper.service.EmailService;
import com.testpaper.service.UserService;


@RestController
@RequestMapping("/Admin")
@CrossOrigin("http://localhost:3000/")
public class AdminController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private TestRepository testRepo;
	
	@Autowired
	private QuestionRepository questionRepo;
	
	@Autowired
	private SubjectRepository subjectRepo;
	
	@Autowired
	private EmailService emailService;
	
	    @PostMapping("/user")
	    public String addUser(@RequestBody User user) {
	        // Generate random password
	        String password = generateRandomPassword();

	        // Set user details
	        user.setRole("USER");
	        user.setPassword(password);
	        this.userService.createUser(user);
	        
	        sendMail(user.getUsername(),user.getEmail(),password);

	        return user.getUsername();
	    }
	    
	    public void sendMail(String username,String email, String password) {
	    	this.emailService.sendMail(username,email,password);
	    }
	    
	    private String generateRandomPassword() {
	        String capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	        String smallLetters = "abcdefghijklmnopqrstuvwxyz";
	        String specialCharacters = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
	        String numbers = "0123456789";

	        StringBuilder password = new StringBuilder();
	        Random random = new Random();

	        // Ensure at least one character from each category
	        password.append(getRandomCharacter(capitalLetters, random));
	        password.append(getRandomCharacter(smallLetters, random));
	        password.append(getRandomCharacter(specialCharacters, random));
	        password.append(getRandomCharacter(numbers, random));

	        // Generate remaining characters
	        for (int i = 4; i < 8; i++) {
	            String category = getRandomCategory(random);
	            String characters = getCategoryCharacters(category);

	            password.append(getRandomCharacter(characters, random));
	        }

	        return password.toString();
	    }

	    private char getRandomCharacter(String characters, Random random) {
	        int index = random.nextInt(characters.length());
	        return characters.charAt(index);
	    }

	    private String getRandomCategory(Random random) {
	        String[] categories = {"capital", "small", "special", "number"};
	        int index = random.nextInt(categories.length);
	        return categories[index];
	    }

	    private String getCategoryCharacters(String category) {
	        switch (category) {
	            case "capital":
	                return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	            case "small":
	                return "abcdefghijklmnopqrstuvwxyz";
	            case "special":
	                return "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
	            case "number":
	                return "0123456789";
	            default:
	                return "";
	        }
	    }

	    @GetMapping("/user/{id}")
	    public User getUserById(@PathVariable("id") Long id) {
	        return this.userRepo.findById(id)
	                .orElseThrow(() -> new UserNotFoundException(id));
	    }

	    @GetMapping("/users")
	    public List<User> getAllUsers() {
	        return this.userService.getAllUsers();
	    }

	    @PutMapping("/user/{id}")
	    public User updateUser(@RequestBody User update, @PathVariable("id") Long id) {
	        return userRepo.findById(id)
	                .map(user -> {
	                    user.setUsername(update.getUsername());
	                    user.setEmail(update.getEmail());
	                    user.setPassword(update.getPassword());
	                    user.setPhoneNo(update.getPhoneNo());
	                    user.setRole("USER");
	                    user.setChecked(true);
	                    return userRepo.save(user);
	                })
	                .orElseThrow(() -> new UserNotFoundException(id));
	    }

	
	@DeleteMapping("/user/{id}")
	public String deleteUser(@PathVariable("id") Long userId) {
		this.userService.deleteUser(userId);
		return "deleted";
	}
	
	@PutMapping("/{id}")
	public User disableUser(@PathVariable("id") Long userId) {
		Optional<User> user = this.userService.findByUserId(userId);
		User u1 = user.get();
		u1.setChecked(false);
		
		this.userRepo.save(u1);
		
		return u1;
	}
	
	 @GetMapping("/testCount")
	  public ResponseEntity<TestCountResponse> getQuizCount() {
		 long activeCount = testRepo.countByActive(true);
		    long totalCount = testRepo.count();
		    
		    TestCountResponse response = new TestCountResponse(activeCount, totalCount);
		    return ResponseEntity.ok(response);
	  }
	 
	 @GetMapping("/userCount")
	 public Map<String, Long> getUserCount() {
	   long totalCount = userRepo.count();
	   long checkedCount = userRepo.countByChecked(true);

	   Map<String, Long> countMap = new HashMap<>();
	   countMap.put("totalCount", totalCount);
	   countMap.put("checkedCount", checkedCount);

	   return countMap;
	 }
	 
	 @GetMapping("/subjectCount")
	 public Map<String, Long> getSubjectCount() {
	   long subjectCount = subjectRepo.count();

	   Map<String, Long> countMap = new HashMap<>();
	   countMap.put("subjectCount", subjectCount);

	   return countMap;
	 }

	 @GetMapping("/questionCount")
	 public Map<String, Long> getQuestionCount() {
	   long questionCount = questionRepo.count();

	   Map<String, Long> countMap = new HashMap<>();
	   countMap.put("questionCount", questionCount);

	   return countMap;
	 }

}
