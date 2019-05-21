package carProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carpart")
public class CarPart {
    @Id
    private String id;
    private String name;
    private Route route;
    private Double kmLifespan;
    private Double kmPresent;  
    private DetritionState stateModal;   


	public CarPart(String name, Route route, Double kmLifespan, Double kmPresent,
			DetritionState stateModal) {
		this.name = name;
		this.route = route;
		this.kmLifespan = kmLifespan;
		this.kmPresent = kmPresent;
		this.stateModal = stateModal;
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
	
	public Route getRoute() {
		return route;
	}
	
	public void setRoute(Route route) {
		this.route = route;
	}
	
	public Double getKmLifespan() {
		return kmLifespan;
	}
	
	public void setKmLifespan(Double kmLifespan) {
		this.kmLifespan = kmLifespan;
	}
	
	public Double getKmPresent() {
		return kmPresent;
	}
	
	public void setKmPresent(Double kmPresent) {
		this.kmPresent = kmPresent;
	}

	public DetritionState getStateModal() {
		return stateModal;
	}

	public void setStateModal(DetritionState stateModal) {
		this.stateModal = stateModal;
	}    
}
