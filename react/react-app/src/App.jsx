import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/JournalItem";
import CardButton from "./components/CardButton/CardButton";

function App() {
  const data = [
    {
      title: "Подготовка обновления курсов",
      date: new Date(),
      text: "Горные походы открывают удвительные природные ландшафты",
    },
    {
      title: "Подготовка обновления курсов2222",
      date: new Date(),
      text: "Горные походы 222 открывают удвительные природные ландшафты",
    },
  ];

  return (
    <>
      <h1>Hello</h1>
      <p>Hello</p>
      <Button />
      <CardButton>
        <JournalItem
          title={data[1].title}
          text={data[1].text}
          date={data[1].date}
        />
      </CardButton>
      <JournalItem
        title={data[0].title}
        text={data[0].text}
        date={data[0].date}
      />
    </>
  );
}

export default App;
