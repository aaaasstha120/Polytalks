const Feature = ({
  title,
  description,
  imageId,
}: {
  title: string;
  description: string;
  imageId: number;
}) => (
  <div className="flex flex-col py-6 px-8 gap-8 lg:odd:flex-row-reverse justify-center items-center lg:flex-row">
    <div className="w-full  lg:w-1/2">
      <img src={`${imageId}.jpg`} className="w-11/12 mx-auto" />
    </div>
    <div className="flex flex-1 flex-col h-screen items-center justify-center text-black  text-center">
      <div className="font-semibold text-xl lg:text-3xl">{title}</div>
      <div className="font-light mt-5  max-w-md text-lg lg:text-2xl">
        {description}
      </div>
    </div>
  </div>
);
const features = [
  {
    title: "Healthy Learning, Lively Conversations",
    description:
      "PolyTalks is not just a language learning app, it's an immersive adventure. Our platform is designed to provide you with an engaging and healthy language learning experience that mirrors real-life conversations.",
  },
  {
    title: "Live Language Immersion",
    description:
      "With PolyTalks, you won't be confined to textbooks and monotonous exercises. Our app brings language to life through live interactions with native speakers and fellow learners from around the globe.",
  },
  {
    title: "Cultural Insights",
    description:
      "Languages are not just about words; they are windows into diverse cultures. Explore the rich tapestry of customs, traditions, and perspectives that make each language unique. Gain cultural insights that go beyond grammar and vocabulary.",
  },
  {
    title: "Healthy Mind, Healthy Learning",
    description:
      "At PolyTalks, we believe in nurturing not only your language skills but also your overall well-being. Our approach promotes healthy learning habits, mindfulness, and balance. We encourage you to take breaks, reflect, and stay motivated on your language learning journey.",
  },
];
function Features() {
  return (
    <div
      id="features"
      className="bg-white flex flex-col pt-3.5 items-start max-w-7xl mx-auto divide-y-2"
    >
      {features.map((feature, index) => (
        <Feature
          title={feature.title}
          description={feature.description}
          key={index}
          imageId={index}
        />
      ))}
    </div>
  );
}

export default Features;
