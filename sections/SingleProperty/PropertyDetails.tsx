type Props = {
  property: any;
};

export default function PropertyDetails({ property }: Props) {
  const details = property.propertyDetail;

  return (
    <div>
<h2 className="heading text-primary">{property.title}</h2>
            <p className="meta">{details.city}, {details.state}</p>
             {property.content && (

        <div
          className="entry-content mt-10"
          dangerouslySetInnerHTML={{
            __html: property.content,
          }}
        />

      )}

            
      

    </div>
  );
}