package com.testpaper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The PaperGenraterCodeApplication class is annotated with @SpringBootApplication,
 * which indicates that it is a Spring Boot application.
 * This annotation enables auto-configuration and component scanning features provided by Spring Boot.
 * 
 * @author TPG team
 * @since 21-06-2023
 * @version 17
 */
@SpringBootApplication
public class PaperGenraterCodeApplication {

	/**
	 * The main method of the PaperGenraterCodeApplication class is responsible for starting the application.
	 * It invokes the SpringApplication.run() method to launch the Spring Boot application.
	 *
	 * @param args The command-line arguments passed to the application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(PaperGenraterCodeApplication.class, args);
	}

}
