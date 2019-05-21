package carProject.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "millimeterpart")
public class MillimeterPart extends CarPart{
	private String millimeterAccepted;
	private String millimeterPresent;

	public MillimeterPart(String name, Route route, Double kmLifespan, Double kmPresent, DetritionState stateModal,
			String millimeterAccepted, String millimeterPresent) {
		super(name, route, kmLifespan, kmPresent, stateModal);
		this.millimeterAccepted = millimeterAccepted;
		this.millimeterPresent = millimeterPresent;
	}

	public String getMillimeterAccepted() {
		return millimeterAccepted;
	}
	
	public void setMillimeterAccepted(String millimeterAccepted) {
		this.millimeterAccepted = millimeterAccepted;
	}
	
	public String getMillimeterPresent() {
		return millimeterPresent;
	}
	
	public void setMillimeterPresent(String millimeterPresent) {
		this.millimeterPresent = millimeterPresent;
	}
}
