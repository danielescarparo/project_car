package carProject.model;

public class Race {
   /**
    * class responsible for get information in front-end
    */
    private Double kilometer;
    private String route;
    private String millimeterTire;
    private String millimeterDisc;
    private String millimeterPastille;
    private String monthsFluid;
    private String monthsAdditive; 
    
    /**
     * Constructor
     */
	public Race(Double kilometer, String route, String millimeterTire, String millimeterDisc, String millimeterPastille,
			String monthsFluid, String monthsAdditive) {
		this.kilometer = kilometer;
		this.route = route;
		this.millimeterTire = millimeterTire;
		this.millimeterDisc = millimeterDisc;
		this.millimeterPastille = millimeterPastille;
		this.monthsFluid = monthsFluid;
		this.monthsAdditive = monthsAdditive;
	}

	public Double getKilometer() {
		return kilometer;
	}
	
	public void setKilometer(Double kilometer) {
		this.kilometer = kilometer;
	}
	
	public String getRoute() {
		return route;
	}
	
	public void setRoute(String route) {
		this.route = route;
	}
	
	public String getMillimeterTire() {
		return millimeterTire;
	}
	
	public void setMillimeterTire(String millimeterTire) {
		this.millimeterTire = millimeterTire;
	}
	
	public String getMillimeterDisc() {
		return millimeterDisc;
	}
	
	public void setMillimeterDisc(String millimeterDisc) {
		this.millimeterDisc = millimeterDisc;
	}
	
	public String getMillimeterPastille() {
		return millimeterPastille;
	}
	
	public void setMillimeterPastille(String millimeterPastille) {
		this.millimeterPastille = millimeterPastille;
	}
	
	public String getMonthsFluid() {
		return monthsFluid;
	}
	
	public void setMonthsFluid(String monthsFluid) {
		this.monthsFluid = monthsFluid;
	}
	
	public String getMonthsAdditive() {
		return monthsAdditive;
	}
	
	public void setMonthsAdditive(String monthsAdditive) {
		this.monthsAdditive = monthsAdditive;
	}    
}
