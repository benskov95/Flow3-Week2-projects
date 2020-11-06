package classes;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

class FactorialCalculator implements Callable<Integer> {
    private final Integer number;
 
    public FactorialCalculator(Integer number) {
        this.number = number;
    }
 
    @Override
    public Integer call() throws Exception {
 
        int result = 1;
 
        if ((number == 0) || (number == 1)) {
            result = 1;
        } else {
            for (int i = 2; i <= number; i++) {
                result *= i;
                TimeUnit.MILLISECONDS.sleep(20);
            }
        }
 
        System.out.printf("Factorial of %d is :: %d\n", number, result);
        return result;
    }
}