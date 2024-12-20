import { Alert, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';
import { useEffect } from 'react';

const Prices = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching loadConcertsRequest action');
    dispatch(loadConcertsRequest());
  }, [dispatch]);
  const concerts = useSelector(getConcerts);
  console.log('concerts:', concerts);

  if (concerts.length > 0) {
    return (
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>

        <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        <h2>Day one</h2>
        <p>Price: {concerts[0].price}</p>
        <p>Workshops: "Rock Music Style", "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>
        <h2>Day Two</h2>
        <p>Price: {concerts[1].price}</p>
        <p>Workshops: "Find your real tune", "Find your real YOU", "Fell the music", "Jam session"</p>
        <h2>Day three</h2>
        <p>Price: {concerts[2].price}</p>
        <p>Workshops: "Increase your vocal range", "How to properly warmup before singing", "It's time for YOU!"</p>
      </Container>
    )
  } else {
    return <Container>Loading...</Container>;
  }
};

export default Prices;