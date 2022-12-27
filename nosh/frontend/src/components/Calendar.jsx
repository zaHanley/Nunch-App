import React from 'react';

function Calendar(props) {
  const { currentDate, recipes } = props;

  const now = new Date();

// Calculate the start and end dates for the current week
const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6);

// Generate an array of days for the current week
const days = [];
let currentDay = startDate;
while (currentDay <= endDate) {
  days.push(new Date(currentDay));
  currentDay.setDate(currentDay.getDate() + 1);
}

  // Render the calendar as a table with seven columns, one for each day of the week
  return (
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {days.map(day => (
            <td>
              <div>{day.toDateString()}</div>
              {recipes && recipes[day] &&
                recipes[day].map(recipe => (
                  <div>{recipe.name}</div>
                ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Calendar