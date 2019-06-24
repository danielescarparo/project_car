package carProject.model;

public enum DetritionState {
   /**
    * Enum state modal
    */
	NONE(0), WARNING(1), ALERT(2), PENDING(3);

    int value;

    /**
     * Constructor
     */
    DetritionState(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }
}
