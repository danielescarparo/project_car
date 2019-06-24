package carProject.model;

public enum PartType {
   /**
    * Enum part type
    */
	DEPTH(0), THICKNESS(1), MONTHS(2);

    int value;
    
    /**
     * Constructor
     */
    PartType(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }	

}
