import "../styles/FAQ.css"
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
  }
  
  const faqData: FAQItem[] = [
    {
      question: "How can I get started with the Right Resource Fit?",
      answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem consequuntur, blanditiis dignissimos sint quia temporibus impedit? Sed quod doloribus ipsum totam officiis neque quisquam, dolorum, ut alias velit nihil aut odio voluptas natus accusamus quibusdam rem eaque, quae ullam impedit corporis. Sint, aperiam. Pariatur deleniti vitae ab dicta nihil minima quis ex fuga illo blanditiis."
    },
    {
      question: "What features are included in the Right Resource Fit?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem iusto similique odit commodi suscipit voluptatum, dolorem, molestias voluptates perferendis quo doloribus, unde aspernatur nostrum assumenda alias. Accusantium, aliquid ipsum!"
    },
    {
      question: "How will the project improve the recruitment process?",
      answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta impedit pariatur, nihil eaque ipsam perferendis saepe corporis nam dolorem tempore rerum omnis quod ea vero! Cum, aspernatur dicta deleniti vel porro at hic unde eos iusto expedita voluptate architecto maxime cupiditate excepturi laboriosam tempora voluptatum! Voluptatibus nisi soluta veritatis ea."
    },
    {
      question: "Can this project be integrated with existing HR systems?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quidem, dolore ea omnis veniam, in numquam laudantium officiis illo, tempore eum itaque ab voluptates perferendis! Nostrum, labore delectus, quaerat quis quam sequi quas fugiat mollitia asperiores quibusdam, atque qui totam."
    },
    {
      question: "What support is available for users of this project?",
      answer: "Users have access to 24/7 customer support, extensive documentation, and an online help center to resolve any issues they may face."
    }
  ];

const FaqQuestion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };
  return (
    <div>
      <div className="faq-accordion">
      <h3>FREQUENTLY ASKED QUESTION</h3>
      <h1>🤔 • FAQs</h1>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <div 
              className={`faq-question ${activeIndex === index ? "active" : ""}`} 
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className={`faq-icon ${activeIndex === index ? "rotate" : ""}`}>
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default FaqQuestion
