package carProject.model;

public enum DetritionState {
	NONE(0), WARNING(1), ALERT(2), PENDING(3);

    int value;

    DetritionState(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }
}
