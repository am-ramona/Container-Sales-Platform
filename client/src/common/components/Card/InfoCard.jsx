import PropTypes from "prop-types";
import { Card } from "../../styles";
import tw, { styled } from "twin.macro";

/** Styles **/
const StyledCard = styled(Card)`
  ${tw`
  overflow-hidden 
  flex flex-col 
  justify-between 
  space-y-6
  relative
  `}
`;

const Content = tw.div`
flex flex-row
justify-between 
pl-7 pr-7 
items-center
`;

export default function InfoCard({
  borderColor,
  icon,
  title,
  children,
  link,
  data,
  multilineHeader,
}) {
  return (
    <StyledCard
      animated
      hasHighlightedBorder
      style={{ borderColor: borderColor }}
    >
      {multilineHeader ? (
        <div>
          <h1 tw="text-lg truncate text-primary-blue">{title}</h1>
          {children}
        </div>
      ) : (
        <div>
          <h1 tw="text-lg truncate-2-lines text-primary-blue">
            {title} {children}
          </h1>
        </div>
      )}
      <Content>
        {icon}
        <h1 tw="text-3xl text-primary-blue">{data}</h1>
      </Content>
      <div>
        {link && (
          <>
            <hr />
            <span tw="mt-3 ml-3 capitalize text-primary-blue font-normal text-13 tracking-tighter hover:text-secondary-blue">
              {link}
            </span>
          </>
        )}
      </div>
    </StyledCard>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  multilineHeader: PropTypes.bool.isRequired,
  borderColor: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
  link: PropTypes.element.isRequired,
  children: PropTypes.node,
  icon: PropTypes.element.isRequired,
};
