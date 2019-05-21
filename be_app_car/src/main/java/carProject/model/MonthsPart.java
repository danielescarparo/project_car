package carProject.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "monthspart")
public class MonthsPart extends CarPart{
	private String monthsAccepted;
	private String monthsPresent;

	public MonthsPart(String name, Route route, Double kmLifespan, Double kmPresent, DetritionState stateModal,
			String monthsAccepted, String monthsPresent) {
		super(name, route, kmLifespan, kmPresent, stateModal);
		this.monthsAccepted = monthsAccepted;
		this.monthsPresent = monthsPresent;
	}

	public String getMonthsAccepted() {
		return monthsAccepted;
	}
	
	public void setMonthsAccepted(String monthsAccepted) {
		this.monthsAccepted = monthsAccepted;
	}
	
	public String getMonthsPresent() {
		return monthsPresent;
	}
	
	public void setMonthsPresent(String monthsPresent) {
		this.monthsPresent = monthsPresent;
	}	
}
