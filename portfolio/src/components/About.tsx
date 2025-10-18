const About = () => {
  return (
    <section id="about" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-mono">About Me</h2>
        <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 font-mono">
          I'm an 18-year-old developer from Delhi, India, with a passion for both frontend and backend development. 
          As a science stream student, I've cultivated a deep interest in technology and how it can be harnessed to create impactful digital solutions.
        </p>
        <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-mono">
          My journey in tech began with a fascination for the inner workings of the internet. Over the years, I've developed a diverse skill set, 
          ranging from programming languages and design tools to various technologies like MySQL, MongoDB, Linux, networking, and Docker. 
          Currently, I'm working with RudraCloud, a hosting company I founded, and I'm excited to start a new journey with Coneiz.
        </p>
      </div>
    </section>
  );
};

export default About;
