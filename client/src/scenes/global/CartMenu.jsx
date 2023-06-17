import { Box, Button , Divider ,IconButton , Typography, formControlClasses} from '@mui/material';
import { useSelector , useDispatch } from 'react-redux';
// import {
//     CloseIcon , AddIcon , RemoveIcon
// } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import { shades } from '../../theme';
import {
    decreaseCount, increaseCount, removeFromCart, setIsCartOpen,
} from '../../state';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)`
    display : flex;
    justify-content : space-between;
    align-items: center;
`;

const CartMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen =useSelector((state) => state.cart.isCartOpen);
    const totalPrice = cart.reduce((total,item) => {
        return total + item.count * item.attribute.price;
    },0);

    return (
        <Box
            display={isCartOpen ? 'block' : 'none'}
            backgroundColor="rgba(0,0,0,0.0)"
            position="fixed"
            zIndex={10}
            width="100%"
            height="100%"
            left="0"
            right="0"
            overflow="auto"
        >
            {/* MODAL */}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px,30%)"
                height="100%"
                backgroundColor="#F3F2ED"
                // border="0.5px solid black"
            >
                <Box
                    padding="30px"
                    overflow="auto"
                    heigth="100%"
                >
                    {/* Header */}
                    <FlexBox mb="15px">
                        <Typography
                            variant='h3'
                        >
                            Shopping Bag ({cart.length})
                        </Typography>
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                        >
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    {/* Cart List */}
                    <Box>
                        {cart.map((item) =>(
                            <Box
                                key={`${item.attribute.name}-${item.id}`}
                            >
                                <FlexBox p="15px 0">
                                    <Box
                                        flex="1 1 40%"
                                    >
                                        <img
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={`http://localhost:1337${item?.attribute?.image?.data?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    <Box
                                        flex="1 1 60%"
                                    >
                                        {/* Item name */}
                                        <FlexBox mb="5px">
                                            <Typography 
                                                fontWeight="bold"
                                            >
                                              {item.attribute.name}  
                                            </Typography>
                                            <IconButton
                                                onClick={() =>  dispatch(removeFromCart({ id : item.id}))}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        {/* Short Description */}
                                        <Typography>{item.attribute.shortDescription}</Typography>

                                        {/* Decrease item counter */}
                                        <FlexBox m="15px 0px">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px soild ${shades.neutral[500]}`}
                                            >
                                                <IconButton onClick={() => dispatch(decreaseCount({ id : item.id }))}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography>{item.count}</Typography>
                                                <IconButton onClick={() => dispatch(increaseCount({ id : item.id }))}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            {/* Price */}
                                            <Typography fontWeight="bold">${item.attribute.price}</Typography>
                                        </FlexBox>
                                        
                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                    {/* Actions */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">Subtotal</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor : shades.primary[400],
                                color : 'white',
                                borderRadius : 0,
                                minWidth: "100%",
                                padding: "20px 20px",
                                m: "20px 0"
                            }}
                            onClick={() => {
                                navigate("/checkout")
                                dispatch(setIsCartOpen({}))
                            }}   
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CartMenu;