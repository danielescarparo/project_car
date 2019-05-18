package carProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	
	@Id
    private String id;
    private String name;
    private Automobile automobile;      

	public User(String name, Automobile automobile) {
		this.name = name;
		this.automobile = automobile;
	}

	public User(String name) {
		this.name = name;
	}
    
	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public Automobile getAutomobile() {
		return automobile;
	}

	public void setAutomobile(Automobile automobile) {
		this.automobile = automobile;
	}

}
