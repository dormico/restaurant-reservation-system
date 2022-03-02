## Use Cases

Actors:
- Anonymous user
- Guest
- Restaurant

||Use Cases|
|-----|-----|
|**Title**| **Listing restaurants**|
|Actor|Anonymous user|
|Trigger| Anonymous user opening the application|
|Basic flow| Every restaurant gets listed |
|||
|**Title**| **Listing nearby restaurants**|
|Actor|Anonymous user|
|Preconditions| Anonymous user's location is known |
|Basic flow| Anonymous user can list the restaurants nearby|
|||
|**Title** | **Arrange restaurants' list**|
|Actor|Anonymous user|
|Basic flow| Anonymous user can arrange the restaurants based on various attributes (e.g. crowdedness, price category, food type, opening hours, location, rating)|
|||
|**Title**| **Detailed information on a restaurant**|
|Actor|Anonymous user|
|Preconditions| Restaurants' list is available |
|Trigger| Anonymous user clicking on a restaurant on the list|
|Basic flow| Restaurant details are shown (e.g. price category, type of food, menu, prepares food for takeaway or not, opening hours)|
|||
|**Title**| **Login**|
|Actor|Guest, Restaurant|
|Preconditions| The user has an account |
|Basic flow| Guests and Restaurants can log in to the application |
|Alternative flow| If the Guest or Restaurant doesn't have an account, he should create one |
|||
|**Title**| **Registration as Guest**|
|Actor|Anonymous user|
|Basic flow| Guests can register to the application by providing their e-mail address and a password.|
|||
| **Title** | **Registration as Restaurant** |
|Actor|Anonymous user|
|Basic flow| Restaurants can register by providing the restaurant's name, contact information (e-mail and phone number), location, menu with prices, opening hours, whether they prepare food for takeaway or not, a password and a bank account number.|
|||
| **Title** | **Choosing time interval** |
|Actor|Guest|
|Preconditions| Guest is logged in, a restaurant is chosen |
|Basic flow| Guest can choose reservation time. |
|||
| **Title** | **Table reservation** |
| Actor | Guest |
|Preconditions| Guest is logged in, chose a restaurant and an arrival time|
|Basic flow| The Guest can reserve a table for a given number of persons |
|Alternative flow 1| If the restaurant doesn't have enough free tables, the Guest is given the choice either to reserve for a different timeslot or for the same time in an other restaurant.|
|Alternative flow 2| The Guest doesn't reserve a table, but orders takeaway instead (if the chosen restaurant allows).|
|||
| **Title** | **Ordering meal** |
|Actor|Guest|
|Preconditions| Guest is logged in, reserved a table or ordered takeaway|
|Basic flow| The Guest can order dishes from the menu and the number of helpings per dish|
|||
| **Title** | **Payment** |
|Actor|Guest|
|Preconditions| Guest is logged in, ordered meals|
|Basic flow| The Guest pays for the order|
|||
| **Title** | **Guest receives confirmation e-mail** |
|Actor|Guest|
|Trigger| Guest payed for a dish|
|Basic flow| Guest receives an e-mail about the details of the order|
|||
| **Title** | **Guest asked to evaluate service** |
|Actor|Guest|
|Preconditions| Guest payed for a dish|
|Trigger| Email will be sent 2 hours after the reservation time |
|Basic flow| Guest receives a link to a satisfaction questionnaire. By clicking it he can give feedback on whether the restaurant and the application met his expectations. (e.g. he got a table, the food was served on time, overall impression and rating of the place)|
|||
| **Title** | **Restaurant receives order** |
|Actor|Restaurant|
|Trigger| Guest payed for a dish at the restaurant|
|Basic flow| If a Guest orders something in the application, the restaurant receives a notification with the order details (e.g. time, number of persons, ordered meals)|
|||
| **Title** | **Restaurant lists existing orders** |
|Actor|Restaurant|
|Preconditions| Restaurant has an account, and has existing orders|
|Basic flow| Restaurant can list existing orders and arrange them by various attributes (e.g. time of the reservation, number of persons)|
|||
| **Title** | **View order statistics** |
|Actor|Restaurant|
|Preconditions| The Restaurant has at least one evaluation|
|Basic flow| Restaurant can watch statistics of orders (e.g. most liked dish, popular timeslots, average time spent)|
|||
| **Title** | **Reply to evaluation** |
|Actor|Restaurant|
|Preconditions| The Restaurant has at least one evaluation|
|Basic flow|The Restaurant can reply to evaluations. It will be displayed on the restaurant details page along with the related evaluation.|

-----------------------------------------------------
|| Title|
|-----|-----|
|Actor||
|Preconditions||
|Trigger||
|Basic flow||
|Alternative flow 1||
|Alternative flow 2||
|Alternative flow 3||

Source: https://www.usability.gov/how-to-and-tools/methods/use-cases.html
