FROM openjdk:27-ea-oraclelinux9
ADD   demo-0.0.1-SNAPSHOT-plain.jar AgriSaarthi.jar

ENTRYPOINT ["java", "-jar","AgriSaarthi.jar"]