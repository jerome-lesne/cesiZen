run:
	./mvnw spring-boot:run

debug:
	./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

clean:
	./mvnw clean

test:
	./mvnw test

run-test: test
	./mvnw spring-boot:run

