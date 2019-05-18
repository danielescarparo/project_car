package carProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "cars")
public class Automobile {
    @Id
    private String id;
    private String brand;
    private String model;
    private String version;
    private String year;
    private String engine;
    private List<CarPart> carPart;    
    
	public Automobile(String brand, String model, String version, String year, String engine,
			List<CarPart> carPart) {
		this.brand = brand;
		this.model = model;
		this.version = version;
		this.year = year;
		this.engine = engine;
		this.carPart = carPart;
	}
	
	public String getId() {
		return id;
	}
	
	public String getBrand() {
		return brand;
	}
	
	public void setBrand(String brand) {
		this.brand = brand;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model = model;
	}
	
	public String getVersion() {
		return version;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}
	
	public String getYear() {
		return year;
	}
	
	public void setYear(String year) {
		this.year = year;
	}
	
	public String getEngine() {
		return engine;
	}
	
	public void setEngine(String engine) {
		this.engine = engine;
	}
	
	public List<CarPart> getCarPart() {
		return carPart;
	}
	
	public void setCarPart(List<CarPart> carPart) {
		this.carPart = carPart;
	}        
}
